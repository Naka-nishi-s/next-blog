"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box className="flex flex-col justify-start items-center gap-6 min-w-[60px] w-1/12 pt-6 bg-cyan-100 border-2 border-slate-300 md:flex hidden md:flex">
        <Link href={"/"}>
          <Image
            src={"/img/sidebar/home.png"}
            height={60}
            width={60}
            alt="Home Image"
            className="p-2"
          />
        </Link>
        <Link href={"/mypage"}>
          <Image
            src={"/img/sidebar/human.png"}
            height={60}
            width={60}
            alt="Human Image"
            className="p-2"
          />
        </Link>
        <Link href={"/search"}>
          <Image
            src={"/img/sidebar/search.png"}
            height={60}
            width={60}
            alt="Search Image"
            className="p-2"
          />
        </Link>
        <Link href={"/goods"}>
          <Image
            src={"/img/sidebar/good.png"}
            height={60}
            width={60}
            alt="Goods Image"
            className="p-2"
          />
        </Link>
        <Link href={"/create"}>
          <Image
            src={"/img/sidebar/pen.png"}
            height={60}
            width={60}
            alt="Pen Image"
            className="p-2"
          />
        </Link>
      </Box>
    </>
  );
};
