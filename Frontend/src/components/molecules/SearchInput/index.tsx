import { Search } from "lucide-react";
import React from "react";

type SearchInputProps = {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const SearchInput = ({
  placeholder,
  value,
  onChange,
  onSubmit,
}: SearchInputProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full md:w-1/3">
      <div className="relative flex rounded-full border">
        <button
          type="submit"
          className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center p-2"
        >
          <Search size={24} className="text-primary" />
        </button>
        <input
          type="search"
          name="search"
          aria-label="Search"
          placeholder={placeholder}
          className="w-full rounded-full bg-background py-1 pl-4 pr-10 outline-none placeholder:w-full placeholder:text-sm placeholder:text-slate-600"
          onChange={onChange}
          value={value}
        />
      </div>
    </form>
  );
};
