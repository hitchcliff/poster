const Notifications = ({ ...props }) => {
  return (
    <span className="flex justify-center items-center w-5 h-5 text-white bg-blue-500 font-bold rounded-full text-xs absolute top-0 left-3">
      {props.children}
    </span>
  );
};

export default Notifications;
