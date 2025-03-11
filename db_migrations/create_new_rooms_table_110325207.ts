const execute = async (db: any) => {
  const oldRoomsTable = await db.getTable("rooms");
  const newRoomsData = oldRoomsTable.currentDoc;

  // Check if the rooms_v2 table exists
  const newRoomsTable = await db.getTable("rooms_v2");
  if (!newRoomsTable.isEmpty()) {
    console.info("rooms_v2 already exists. Skipping process");
    return;
  }

  // Persist the new rooms table
  newRoomsTable.currentDoc = newRoomsData;
  await newRoomsTable.persist();

  console.info("rooms_v2 table created successfully");
};

module.exports = { execute };
