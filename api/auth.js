const dummy = {
  email:    'test@test.test',
  password: '123123123'
};

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

export async function verify(req) {
  if (req.params.email === dummy.email && req.params.password === dummy.password) {
    return { result: 1, message: 'Success' }
  } else {
    return {result: 0, message: 'Bad credentials'}
  }
}

export async function login(req) {
  if (req.params.email === dummy.email && req.params.password === dummy.password) {
    return {token: 'qwerty'}
  } else {
    return {result: 0, message: 'Bad credentials'}
  }
}

export async function me(req) {
  if (req.cookies['auth._token.local'] === 'Bearer qwerty')
    return {user: dummy};
  else
    return false;
}
