"use server"
import { prisma } from "@/lib/prisma";

export async function searchProgrammeStudyModes(keyword: string, filter:{active:boolean} = {active:false}){
  const durationTypes = await prisma.programmeStudyMode.findMany({
    where:{
      title:{
        contains: keyword,
        mode: "insensitive",
      },
    }
  })
  return durationTypes
}