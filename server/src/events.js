const event = id => `@server/${id}`;

const STATUS = event("STATUS");
const status = (userId, rooms) => ({
  type: STATUS,
  payload: { userId, rooms }
});
