import { forwardAdminRequest } from "@/lib/admin-api";

export async function POST(request: Request) {
  return forwardAdminRequest(request, "articles", "POST");
}
