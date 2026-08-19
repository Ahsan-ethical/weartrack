-- CreateTable
CREATE TABLE "wardrobe_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "fabric" TEXT NOT NULL,
    "image_url" TEXT,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "wear_count" INTEGER NOT NULL DEFAULT 0,
    "total_wears" INTEGER NOT NULL DEFAULT 0,
    "max_wears_before_wash" INTEGER NOT NULL DEFAULT 5,
    "last_worn_date" TEXT,
    "in_laundry_queue" BOOLEAN NOT NULL DEFAULT false,
    "is_packed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wardrobe_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfit_logs" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "item_ids" TEXT[],
    "tags" JSONB NOT NULL DEFAULT '{}',
    "note" TEXT,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outfit_logs_pkey" PRIMARY KEY ("id")
);
