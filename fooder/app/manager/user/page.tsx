import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/app/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/app/components/managerTemplate/alert";
import Image from "next/image";
import Search from "./search";
import AddUser from "./AddUser";

const getUser = async (search: string): Promise<IUser[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/user?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IUser[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const UserPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search ? searchParams.search.toString() : ``;
  const menu: IUser[] = await getUser(search);
  return (
    <div className="m-2 bg-white text-black rounded-lg p-3 border-t-4 border-t-primary shadow-md">
      <h4 className="text-xl font-bold mb-2">User Data</h4>
      <p className="text-sm text-secondary mb-4">
        This page displays "User" data, allowing Users to view details, search,
        and manage user items by adding, editing, or deleting them.
      </p>
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md flex-grow">
          <Search url={`/manager/menu`} search={search} />
        </div>

        <div className="ml-4">
            <AddUser />
        </div>

      </div>
      {menu.length == 0 ? (
        <AlertInfo title="informasi">No data Available</AlertInfo>
      ) : (
        <>
          <div className="m-2">
            {menu.map((data, index) => (
              <div
                key={`keyPrestasi${index}`}
                className={`flex flex-wrap shadow m-2`}
              >
                <div className="w-full md:w-1/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Picture
                  </small>
                  <br />
                  <Image
                    width={40}
                    height={40}
                    src={`${BASE_IMAGE_PROFILE}/${data.picture}`}
                    className="rounded-sm overflow-hidden"
                    alt="preview"
                    unoptimized
                  />
                </div>
                <div className="w-full md:w-2/12 p-2">
                  <small className="text-sm font-bold text-primary">Name</small>{" "}
                  <br />
                  {data.name}
                </div>
                <div className="w-full md:w-1/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Email
                  </small>{" "}
                  <br />
                  {data.email}
                </div>
                <div className="w-full md:w-5/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Role
                  </small>{" "}
                  <br />
                  {data.role}
                </div>
                <div className="w-full md:w-2/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Action
                  </small>
                  <br />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const category = (cat: string): React.ReactNode => {
  if (cat === "FOOD") {
    return (
      <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Food
      </span>
    );
  }
  if (cat === "SNACK") {
    return (
      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
        Snack
      </span>
    );
  }
  return (
    <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
      Drink
    </span>
  );
};

export default UserPage;
