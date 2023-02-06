import React from "react";
import { Instrument, Squid } from "../models";

interface InstrumentListProps {
  instrumentArr: Instrument[];
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (InstrumentData: any) => Promise<void>;
}

export function InstrumentList({
  instrumentArr,
  handleDelete,
  handleEdit,
}: InstrumentListProps) {
  return (
    <div className="flex flex-col w-60 items-center gap-8">
      {instrumentArr.map((instrument) => {
        return (
          <div key={instrument.id} className="flex flex-col w-40 items-center gap-2 p-4 border-2 border-white border-dashed">
            <h2 className="font-bold">{instrument.name}</h2>
            <p>Type: {instrument.type}</p>
            <p>Color: {instrument.color}</p>
            <p>Squid: {instrument.squid.name}</p>


            <button className="bg-orange-400" onClick={() => handleEdit(instrument)}>Update</button>
            <button className="bg-red-500" onClick={() => handleDelete(instrument.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
