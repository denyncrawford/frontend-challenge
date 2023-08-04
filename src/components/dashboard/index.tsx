
import { useAuth } from "@/utils/auth/AuthContext";
import { useRouter } from "next/router";

export const DashboardCard = () => {
  const { user, signOut } = useAuth();
  const { push } = useRouter();

  console.log(user);
  const handleLogout = async () => {
    await signOut();
    push("/");
  };

  return (
    <div className="px-2">
      <div
        className={
          'border shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[528px] py-10 rounded-[34px] border-solid border-[#eff0f7] bg-white px-4 md:px-12'
        }
      >
        <h2 className={'text-center font-semibold text-[34px] leading-[46px] text-[#556ee6]'}>Bienvenido al Dashboard</h2>
        <p className={'not-italic font-normal text-lg leading-[30px] text-center text-[#4f4f4f] mt-[25px] mb-[33px]'}>
          {user?.email}
        </p>
        <div>
          <button
            color="primary"
            className={
              'h-14 w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-4 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed px-12'
            }
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}