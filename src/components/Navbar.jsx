import '../index.css';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BellIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function Navbar() {
  return (
    <div className="top-0 w-screen h-16 border-gray-300 border-solid border flex items-center fixed bg-white">
      <div className="ml-20 p-5">
        <h1>TAVR</h1>
      </div>
      <div className="flex items-center justify-center right-8 fixed w-auto pr-20">
        <Menu as="div" className="relative">
          <MenuButton className="-m-1.5 flex items-center p-1.5 gap-x-4">
            <span className="sr-only">Open user menu</span>
            <img
              alt=""
              src="images/doctor.png"
              className="rounded-full bg-gray-50"
            />
            <span className="hidden lg:flex lg:items-center lg:flex-col">
              <span
                aria-hidden="true"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Doctor Langston
              </span>
              <div className="flex w-full items-start">
                <p className="text-sm/6 text-gray-400">Site five</p>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 size-5 text-gray-400"
                  fillRule="black"
                />
              </div>
            </span>
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
      <div className="flex items-center justify-center right-8 fixed w-16 h-8 border-l gap-2 pl-5 ml-5">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-black-400 hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>

        <button
          type="button"
          className="-m-2.5 p-2.5 text-black-400 hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <InformationCircleIcon aria-hidden="true" className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
