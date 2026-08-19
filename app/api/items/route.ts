import { NextRequest, NextResponse } from "next/server";
import { pool, requireDatabase } from "@/lib/db";

const COL_MAP: Record<string, string> = {
  id: "id",
  title: "title",
  category: "category",
  brand: "brand",
  color: "color",
  fabric: "fabric",
  imageUrl: "image_url",
  price: "price",
  wearCount: "wear_count",
  totalWears: "total_wears",
  maxWearsBeforeWash: "max_wears_before_wash",
  lastWornDate: "last_worn_date",
  inLaundryQueue: "in_laundry_queue",
  isPacked: "is_packed",
};

function mapRow(row: any) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    brand: row.brand,
    color: row.color,
    fabric: row.fabric,
    imageUrl: row.image_url,
    price: Number(row.price || 0),
    wearCount: Number(row.wear_count || 0),
    totalWears: Number(row.total_wears || 0),
    maxWearsBeforeWash: Number(row.max_wears_before_wash || 5),
    lastWornDate: row.last_worn_date,
    inLaundryQueue: Boolean(row.in_laundry_queue),
    isPacked: Boolean(row.is_packed),
  };
}

export async function GET() {
  try {
    await requireDatabase();
    const result = await pool.query(
      "SELECT * FROM wardrobe_items ORDER BY created_at DESC"
    );
    const items = result.rows.map(mapRow);
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, items: [], error: error.message },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireDatabase();
    const body = await request.json();

    const {
      id,
      title,
      category,
      brand,
      color,
      fabric,
      imageUrl,
      price = 0,
      wearCount = 0,
      totalWears = 0,
      maxWearsBeforeWash = 5,
      lastWornDate,
      inLaundryQueue = false,
      isPacked = false,
    } = body;

    const itemId = id || `item-${Date.now()}`;

    const values = [
      itemId,
      title,
      category,
      brand,
      color,
      fabric,
      imageUrl || null,
      Number(price),
      Number(wearCount),
      Number(totalWears),
      Number(maxWearsBeforeWash),
      lastWornDate || null,
      Boolean(inLaundryQueue),
      Boolean(isPacked),
    ];

    await pool.query(
      `INSERT INTO wardrobe_items (
        id, title, category, brand, color, fabric, image_url, price, wear_count,
        total_wears, max_wears_before_wash, last_worn_date, in_laundry_queue, is_packed
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      values
    );

    return NextResponse.json(
      { success: true, item: { id: itemId, ...body } },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
