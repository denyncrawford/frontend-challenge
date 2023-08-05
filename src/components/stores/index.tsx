import { useStores, useStoresPagination } from "@/hooks/useStores";
import { IStore } from "@/stores";
import Link from "next/link";

export const StoresCard = () => {

  const [pagination, setPagination] = useStoresPagination();
  const { data, isLoading, isError, error } = useStores(pagination);

  const paginate = (operation: 'increment' | 'decrement') => {
    setPagination((prev) => {
      return {
        ...prev,
        page: operation === 'increment' ? prev.page + 1 : prev.page - 1,
      };
    });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => {
      return {
        ...prev,
        page: 1,
        search: e.target.value,
      };
    });
  }

  return (
    <div className="px-2 my-20">
      <div
        className={
          'border shadow-[0px_5px_16px_rgba(8,15,52,0.06)] w-full max-w-[828px] py-10 rounded-[34px] border-solid border-[#eff0f7] bg-white px-4 md:px-12'
        }
      >
        <h2 className={'text-center font-semibold text-[34px] leading-[46px] text-[#556ee6]'}>Listado de tiendas</h2>
        <p
          className='not-italic font-normal text-lg leading-[30px] text-center text-[#4f4f4f] mt-[25px] mb-[33px] px-4 md:px-12'

        >
          Gestiona las tiendas y sus productos
        </p>
        <div className="w-full">
          <div className="grid grid-cols-3 mt-2 gap-5 w-full">
            <div className={'col-span-2'}>
              <label className={'font-normal text-[15px] leading-6 text-[#333333]'}>Busqueda</label>
              <input onChange={handleSearch} value={pagination.search} type="text" placeholder="Buscar tienda" className={'h-16 col-span-2 border text-sm rounded-2xl border-solid p-2.5 border-[#e0e0e0] w-full'} />
            </div>
            <div className="flex flex-col">
              <label className={'font-normal text-[15px] leading-6 text-[#333333]'}>Acciones</label>
              <Link href='/create-store' className="flex-1 flex justify-center items-center rounded-2xl break-keep text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed px-5"
              >
                <span className="mr-2">Agregar tienda</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="white" fill-rule="evenodd"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" /></svg>
              </Link>
            </div>
          </div>
        </div>
        <div className={'mt-4'}>
          {isLoading &&
            <div className={'text-center w-full flex items-center justify-center text-[#333333] mt-10'}>
              <svg
                aria-hidden="true"
                className="w-10 h-10 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>}
          {isError && <div>{error.message}</div>}
          {data &&
            <>
              <div className={'mt-5 grid grid-cols-3 gap-5'}>
                {
                  data?.results.map((store: IStore, i) => (
                    <div key={i + store.name} className={'cursor-pointer col-span-1 rounded-2xl border w-full max-w-[528px] py-2 px-5 border-solid border-[#eff0f7] bg-white'}>
                      <h2 className={'text-[#556ee6] font-semibold'}>{store.name}</h2>
                      <p className={'font-normal text-[15px] leading-6 text-[#333333]'}>{store.address}</p>
                      <p className={'font-normal text-[15px] leading-6 text-[#333333]'}>{store.phone}</p>
                      <p className={'font-normal text-[15px] leading-6 text-[#333333]'}>{store.email}</p>
                    </div>

                  ))
                }
              </div>
              <div className="mt-5">
                <p className="font-normal text-[15px] leading-6 text-[#333333]"> Pagina {pagination.page}</p>
                <p className="font-normal text-[15px] leading-6 text-[#333333]">Mostrando {data?.results.length} tiendas de {data?.total}</p>
                <div className={'flex gap-5 justify-center'}>
                  <button
                    className="h-14 w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-4 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed px-2"
                    onClick={() => paginate('decrement')}
                    disabled={pagination.page === 1}
                  >
                    Anterior
                  </button>
                  <button className="h-14 w-full rounded-2xl text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] mt-4 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed px-2"
                    onClick={() => paginate('increment')}
                    disabled={pagination.page === Math.ceil(data?.total / pagination.limit)}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </>}
        </div>
      </div>
    </div >
  )
}

export default StoresCard;