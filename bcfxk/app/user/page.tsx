import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ChangeInfo from "./changeInfo";
import Addresses from "./changeAddress";
import { redirect } from "next/navigation";
import { UserRoundCog } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { LogOut } from "lucide-react";
type User = {
  name: string;
  email: string;
}

async function getUser():Promise<User> {

  const cookieStore = await cookies()
  console.log("cookie: ", cookieStore.toString())
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      Cookie: cookieStore.toString()
    },
    credentials: "include"
  });
  if (res.status === 401) {
    redirect("/login")
  }
  if(!res.ok){
    throw new Error(`Fetch Failed:  ${res.status} ${res.statusText}`)
  }  
  return res.json()
}


export default async function showUser(){
  const user = await getUser();
  
  
  return (
    <div className="p-6">
      <main className="">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 rounded-xl items-center border bg-[var(--accent)]">
          <aside className="grid grid-cols-2 md:grid-cols-2 gap-10 items-center bg-[var(--accent)] rounded-xl p-4 max-w-3xl">
            <CircleUserRound className="w-[200px] h-[150px] "/>
          
          <h1 className="text-3xl">
            {user.name}
          </h1>
          <div className="col-span-2 flex flex-row gap-2 justify-center items-center">
            
            <Link href={'#'} className="border p-3 px-50 items- rounded-xl bg-[var(--surface)] flex flex-row gap-2 justify-center items-center w-full ">
              <ShoppingBasket className="w-6 h-6" />
            My Order</Link>
          </div>
          <div className="col-span-2 flex flex-row gap-2 justify-center items-center">
            
            <Link href={'#'} className="border p-3 px-50 items- rounded-xl bg-[var(--surface)] flex flex-row gap-2 justify-center items-center w-full ">
              <UserRoundCog className="w-6 h-6" />
            User</Link>
          </div>
          <div className="col-span-2 flex flex-row gap-2 justify-start items-center">
            
            <Link href={'/login'} className=" px-10 p-3 items- rounded-xl bg-red-700 flex flex-row gap-2 justify-center items-center ">
              <LogOut className="w-6 h-6" />
            Log Out</Link>
          </div>
          </aside>
          <div className="border rounded-l bg-[var(--surface)] max-w-full">
            <ChangeInfo />
            <Addresses recipientName={user.name} />
          </div>


        </div>
        
      </main>
    </div>
  )
}