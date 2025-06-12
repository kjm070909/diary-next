-- CreateTable
CREATE TABLE "Likes" (
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "diaryId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "diaryId"),
    CONSTRAINT "Likes_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Diary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Diary" ("create_at", "description", "id", "photo", "title", "updated_at", "userId") SELECT "create_at", "description", "id", "photo", "title", "updated_at", "userId" FROM "Diary";
DROP TABLE "Diary";
ALTER TABLE "new_Diary" RENAME TO "Diary";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
