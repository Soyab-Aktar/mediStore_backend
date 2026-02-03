-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('CASH_ON_DELIVERY');

-- CreateTable
CREATE TABLE "medicines" (
    "medicine_id" TEXT NOT NULL,
    "medicine_name" VARCHAR(200) NOT NULL,
    "medicine_description" TEXT NOT NULL,
    "medicine_price" INTEGER NOT NULL,
    "medicine_manufacturer" VARCHAR(150) NOT NULL,
    "medicine_stock" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("medicine_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" TEXT NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "category_description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" TEXT NOT NULL,
    "medicine_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "cart" (
    "cart_id" TEXT NOT NULL,
    "medicine_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PLACED',
    "shippingAddress" TEXT NOT NULL,
    "paymentMethod" "PaymentMethods" NOT NULL DEFAULT 'CASH_ON_DELIVERY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "order_item_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "medicine_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateIndex
CREATE INDEX "medicines_category_id_idx" ON "medicines"("category_id");

-- CreateIndex
CREATE INDEX "medicines_seller_id_idx" ON "medicines"("seller_id");

-- CreateIndex
CREATE INDEX "reviews_medicine_id_idx" ON "reviews"("medicine_id");

-- CreateIndex
CREATE INDEX "reviews_customer_id_idx" ON "reviews"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_customer_id_medicine_id_key" ON "reviews"("customer_id", "medicine_id");

-- CreateIndex
CREATE INDEX "cart_medicine_id_idx" ON "cart"("medicine_id");

-- CreateIndex
CREATE INDEX "cart_customer_id_idx" ON "cart"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_customer_id_medicine_id_key" ON "cart"("customer_id", "medicine_id");

-- CreateIndex
CREATE INDEX "orders_customer_id_idx" ON "orders"("customer_id");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "order_items_medicine_id_idx" ON "order_items"("medicine_id");

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("medicine_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("medicine_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("medicine_id") ON DELETE CASCADE ON UPDATE CASCADE;
