const Trendings = () => {
  return (
    <div className="flex flex-col w-full text-dark dark:text-light">
      <h2 className="font-bold">Trendings</h2>
      <div className=" p-5 overflow-hidden shadow-sm rounded-md dark:bg-dark bg-light">
        <ul className="flex flex-col gap-5">
          <li className="border border-dark dark:border-white rounded-md p-2">
            News (100 Posts)
          </li>
          <li className="border border-dark dark:border-white rounded-md p-2">
            Celibrities (100 Posts)
          </li>
          <li className="border border-dark dark:border-white rounded-md p-2">
            Foods (100 Posts)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Trendings;
