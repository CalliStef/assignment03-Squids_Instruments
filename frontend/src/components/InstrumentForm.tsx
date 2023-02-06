import React, { ChangeEventHandler, useState, useEffect } from "react";
import { Instrument, Squid } from "../models";
import axios from 'axios';

interface InstrumentFormProps {
  handleAddUpdate: (formData: Instrument) => void;
  instrument?: Instrument;
}

export function InstrumentForm({ handleAddUpdate, instrument }: InstrumentFormProps) {
  const [squids, setSquids] = useState<Squid[]>([]);
  const [formData, setFormData] = useState<Instrument | undefined>(instrument);

  useEffect(() => {
    (async (): Promise<void> => {
      const { data } = await axios.get<Squid[]>("/api/squids");
      console.log(data);
      setSquids(data);
    })();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement> ) {
    e.preventDefault();

    setFormData({
          ...formData,
        [e.target.name]: e.target.value,
    } as unknown as Instrument);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddUpdate(formData!);
  }

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
      <label htmlFor="nameInput">Instrument Name:</label>
      <input
        id="nameInput"
        type="text"
        name="name"
        value={formData?.name}
        onChange={handleChange}
      />

      <label htmlFor="colorInput">Instrument type:</label>
      <input
        id="typeInput"
        type="text"
        name="type"
        value={formData?.type}
        onChange={handleChange}
      />

      <label htmlFor="colorInput">Instrument color:</label>
      <input
        id="colorInput"
        type="text"
        name="color"
        value={formData?.color}
        onChange={handleChange}
      />

    <label htmlFor="squidId">Choose a squid:</label>
        <select name="squidId" id="squidId" onChange={handleChange}>
        {
            squids.map((squid) => (
                <option key={squid.id} value={squid.id}>{squid.name}</option>
            ))
        }
        </select>   

      <button className="bg-green-400 text-black" type="submit">Submit</button>
    </form>
  );
}
