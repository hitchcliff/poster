const Trendings = () => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-dark font-bold">Trendings</h2>
      <div className="bg-dark text-light p-5 overflow-hidden shadow-sm rounded-md ">
        <ul className="flex flex-col gap-5">
          <li className="border border-white rounded-md p-2">
            News (100 Posts)
          </li>
          <li className="border border-white rounded-md p-2">
            Celibrities (100 Posts)
          </li>
          <li className="border border-white rounded-md p-2">
            Foods (100 Posts)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Trendings;
