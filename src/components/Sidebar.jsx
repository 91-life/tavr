import { UsersIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Team", href: "#", icon: UsersIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  return (
    <div className="top-0 h-screen w-20 border-gray-300 border-r border-solid fixed bg-white">
      <div className="flex h-16 shrink-0 items-center p-[17px] border-b border-gray-200 bg-white">
        <img alt="Logo" src="images/logo.png" className="h-8 w-auto" />
      </div>
      <div className="">
        <div className="mt-5">
          {navigation.map((item) => (
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-[rgba(0,153,153,0.12)] border-l-[4px] border-l-[#009999]"
                  : "hover:bg-[rgba(0,153,153,0.12)]",
                "group flex gap-x-3 p-2 text-sm/6 font-semibold text-gray-700 min-h-[45px]"
              )}
            >
              <div className="flex w-full items-center justify-center">
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    item.current ? "group-hover:text-[#009999]" : "",
                    "size-6 shrink-0 text-gray-700"
                  )}
                />
              </div>
            </a>
          ))}
        </div>
        <div className="w-20 h-16 border-t border-gray-300 border-solid flex justify-center items-center bottom-0 fixed">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
          <a
            href="#"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:text-[#009999]"
          >
            <Cog6ToothIcon
              aria-hidden="true"
              className="size-7 shrink-0 text-black-400 group-hover:text-hover:text-[#009999]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
