import { getUserById } from "@/actions/user";
import ProfileDetails from "@/components/user/ProfileDetails";
import { ModalProvider } from "@/context/modal.context";
import { UserProvider } from "@/context/user.context";
import { IGetUser } from "@/types/user";
import { getServerAuthSession } from "@/utils/authOptions";

const page = async ({ params }: { params: { id: string } }) => {
  const response = await getUserById(params.id);
  if (!response) return <div>loading...</div>;

  if (response?.status === false) return <div>{response?.error}</div>;

  const session = await getServerAuthSession();

  return (
    <div>
      <UserProvider initialUser={response?.data as IGetUser}>
        <ModalProvider>
          <ProfileDetails currentUserId={session?.user?._id ?? ""} />
        </ModalProvider>
      </UserProvider>
    </div>
  );
};

export default page;
