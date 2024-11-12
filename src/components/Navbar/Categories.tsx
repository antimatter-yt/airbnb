"use client"
import React from "react";
import { TbBeach } from 'react-icons/tb';
import { GiWindmill, GiFarmTractor, GiTreehouse, GiCampfire } from 'react-icons/gi';
import { MdOutlineVilla, MdApartment, MdPool, MdCottage, MdCastle } from 'react-icons/md';
import { FaHouseUser, FaMountain,  } from 'react-icons/fa';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoIosBoat } from 'react-icons/io';
import { AiOutlineHome } from 'react-icons/ai';
import { BsSnow } from 'react-icons/bs';
import { Container } from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import { CategoryBox } from "./CategoryBox";

export const categories = [
    {
      label: "Beach",
      icon: TbBeach,
      description: "Stay near the beach and enjoy the sun and sand.",
    },
    {
      label: "Windmills",
      icon: GiWindmill,
      description: "Experience the charm of historic windmills.",
    },
    {
      label: "Modern",
      icon: MdOutlineVilla,
      description: "Stay in sleek and modern homes with all amenities.",
    },
    {
      label: "Homes",
      icon: FaHouseUser,
      description: "Find cozy and comfortable homes for families and groups.",
    },
    {
      label: "Offices",
      icon: HiOutlineOfficeBuilding,
      description: "Perfect spaces for work or business trips.",
    },
    {
      label: "Farm stays",
      icon: GiFarmTractor,
      description: "Escape to the countryside with a stay on a working farm.",
    },
    {
      label: "Boats",
      icon: IoIosBoat,
      description: "Stay on a boat and enjoy the waterside life.",
    },
    {
      label: "Mountains",
      icon: FaMountain,
      description: "Book a stay in a peaceful mountain retreat.",
    },
    {
      label: "Apartments",
      icon: MdApartment,
      description: "Find stylish and modern apartments in the city.",
    },
    {
      label: "Cottages",
      icon: MdCottage,
      description: "Stay in cozy cottages with beautiful surroundings.",
    },
    {
      label: "Entire homes",
      icon: AiOutlineHome,
      description: "Book an entire home for privacy and comfort.",
    },
    {
      label: "Snow",
      icon: BsSnow,
      description: "For those who love winter sports and cozy snowbound retreats.",
    },
    {
      label: "Castles",
      icon: MdCastle,
      description: "Live like royalty in a historic or fairy-tale castle.",
    },
    {
      label: "Camping",
      icon: GiCampfire,
      description: "Enjoy a rustic camping experience in beautiful natural settings.",
    },
    {
      label: "Pools",
      icon: MdPool,
      description: "Stay in homes with private or shared pools.",
    },
    {
      label: "Treehouses",
      icon: GiTreehouse,
      description: "Stay elevated in a beautiful treehouse surrounded by nature.",
    },
  ];

export const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()
    const isMainPage = pathname === "/"
    if(!isMainPage){
        return null
    }
  return (
    <Container>
      <div
        className="
        pt-0
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        "
      >
        {categories.map((item)=>(
            <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
            />
        ))}
      </div>
    </Container>
  );
};
