import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownItem from "../interfaces/types";
import DropdownSelect from "./DropdownSelect";
import { Brand } from "../interfaces/BrandInterface";

export default function BrandsDropdown({ dropitems }: { dropitems: DropdownItem[] }) {
  const [brandselected, setbrandselected] = useState<Brand | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <DropdownSelect
        label="Brand"
        items={dropitems}
        onSelect={(item: DropdownItem) => {
          navigate("/brand", { state: { brandselectedid: item.id } });
          window.location.reload();
          console.log("Selected item:", item);
        }}
      />
    </>
  );
}
