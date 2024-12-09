import { LuSearch } from "react-icons/lu";

export default function SearchRequisitions() {
    return (
        <div className="relative flex flex-grow">
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[10px] pl-10 text-sm outline-blue-500"
                placeholder="Search Requisitions..."
            />
            <LuSearch
                size={18}
                className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500 peer-focus:text-gray-900"
            />
        </div>
    );
}
