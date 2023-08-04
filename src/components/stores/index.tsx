import { useStores, useStoresPagination } from "@/hooks/useStores";
import { IStore } from "@/stores";

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
              <button className="flex-1 rounded-2xl break-keep text-white font-semibold text-lg leading-[30px] text-center  bg-[#4850F3] focus:outline-none focus:ring-4 focus:ring-blue-300 hover:opacity-[0.90] disabled:opacity-50 disabled:cursor-not-allowed px-2"
              >
                Agregar tienda +
              </button>
            </div>
          </div>
        </div>
        <div className={'mt-4'}>
          {isLoading && <div className={'text-center text-[#333333] mt-5'}>Cargando...</div>}
          {isError && <div>{error as string}</div>}
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
    </div>
  )
}

export default StoresCard;