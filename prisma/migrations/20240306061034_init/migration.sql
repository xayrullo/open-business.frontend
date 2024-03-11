-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "invoice" INTEGER NOT NULL,
    "mfoBank" INTEGER NOT NULL,
    "calculatedInfoice" TEXT NOT NULL,
    "summ" INTEGER NOT NULL,
    "payment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
