/**
 * ユーザ情報をjsonで返す関数
 * @param なし
 * @returns users ユーザ情報
 */
const getUser = async () => {
  try {
    // user情報をjsonにして返却
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const users = await response.json();
    return users;
  } catch (e) {
    console.log(e);
  }
};

const Page = async () => {
  const users = await getUser();

  return (
    <div>
      <div className="text-6xl p-10">pageaaaaaaaa</div>
      <ul>
        {users && users.map((user) => <li key={user.id}>{user.title}</li>)}
      </ul>
    </div>
  );
};

export default Page;
