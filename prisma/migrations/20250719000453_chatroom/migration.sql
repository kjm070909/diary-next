-- CreateTable
CREATE TABLE "chatroom" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_UserTochatroom" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserTochatroom_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserTochatroom_B_fkey" FOREIGN KEY ("B") REFERENCES "chatroom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserTochatroom_AB_unique" ON "_UserTochatroom"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTochatroom_B_index" ON "_UserTochatroom"("B");
