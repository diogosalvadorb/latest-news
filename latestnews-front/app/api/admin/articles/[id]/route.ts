import { forwardAdminRequest } from "@/lib/admin-api";

type Context = { params: Promise<{ id: string }> };
const validId = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  if (!validId(id))
    return Response.json({ message: "Invalid article ID." }, { status: 400 });
  return forwardAdminRequest(request, `articles/${id}`, "PUT");
}

export async function DELETE(request: Request, { params }: Context) {
  const { id } = await params;
  if (!validId(id))
    return Response.json({ message: "Invalid article ID." }, { status: 400 });
  return forwardAdminRequest(request, `articles/${id}`, "DELETE");
}
