export async function getFriends() {
  return (await require("axios").get(`https://reqres.in/api/users?page=1`)).data
    .data.map(entry => {
    return {
      id:        entry.id,
      full_name: entry.first_name + " " + entry.last_name,
      avatar:    entry.avatar
    };
  });
}
