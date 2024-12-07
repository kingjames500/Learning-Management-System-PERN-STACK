/*
  Warnings:

  - A unique constraint covering the columns `[CheckoutRequestID]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_CheckoutRequestID_key" ON "Payment"("CheckoutRequestID");
