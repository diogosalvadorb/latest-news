import "server-only";

export async function forwardAdminRequest(
  request: Request,
  path: string,
  method: "POST" | "PUT" | "DELETE",
) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { message: "Invalid request origin." },
      { status: 403 },
    );
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl)
    return Response.json(
      { message: "The article service is not configured." },
      { status: 503 },
    );
  try {
    const body = method === "DELETE" ? undefined : await request.formData();
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/${path}`, {
      method,
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });
    if (response.status === 204) return new Response(null, { status: 204 });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const problem =
        payload && typeof payload === "object"
          ? (payload as Record<string, unknown>)
          : {};
      return Response.json(
        {
          message:
            response.status >= 500
              ? "The article service is unavailable. Please try again."
              : typeof problem.message === "string"
                ? problem.message
                : response.status === 404
                  ? "Article not found."
                  : "Check the highlighted fields and try again.",
          errors: response.status === 400 ? problem.errors : undefined,
        },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }
    return Response.json(payload, { status: response.status });
  } catch {
    return Response.json(
      { message: "Unable to reach the article service. Please try again." },
      { status: 502 },
    );
  }
}
