import { NextResponse } from "next/server";
import { getSignalWindow, getSignals } from "@/lib/signals";

/* Signal feed endpoint. The hero feed polls this for new events.
   Swap getSignalWindow() for a real collector query and the feed
   starts showing live data with no client changes. */

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const rawOffset = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const rawCount = Number.parseInt(searchParams.get("count") ?? "6", 10);

  const total = getSignals().length;
  const offset = Number.isFinite(rawOffset) ? ((rawOffset % total) + total) % total : 0;
  const count = Number.isFinite(rawCount) ? Math.min(Math.max(rawCount, 1), 20) : 6;

  return NextResponse.json(
    { signals: getSignalWindow(offset, count), total },
    { headers: { "Cache-Control": "no-store" } }
  );
}
