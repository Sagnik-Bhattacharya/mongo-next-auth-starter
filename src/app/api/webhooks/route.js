import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);
    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, username, image_url } = evt?.data;
      try {
        await createOrUpdateUser(id, email_addresses, username, image_url);
        return new Response("User created or updated", { status: 200 });
      } catch (error) {
        console.log("Error creating or updating user:", error);
        return new Response("Error creating or updating user", { status: 500 });
      }
    }
    if (eventType === "user.deleted") {
      const { id } = evt?.data;
      try {
        await deleteUser(id);
        return new Response("User deleted", { status: 200 });
      } catch (error) {
        console.log("Error deleting user:", error);
        return new Response("Error deleting user", { status: 500 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
