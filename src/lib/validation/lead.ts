import { z } from "zod";

export const segmentOptions = [
  { value: "uniformes-profissionais", label: "Uniformes Profissionais" },
  { value: "linha-hospitalar", label: "Linha Hospitalar" },
  { value: "uniformes-escolares", label: "Uniformes Escolares" },
  { value: "texteis-hotelaria", label: "Têxteis para Hotelaria" },
  { value: "outro", label: "Ainda não sei / Outro" },
] as const;

export const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  company: z.string().min(2, "Informe o nome da empresa"),
  phone: z.string().min(8, "Informe um telefone ou WhatsApp válido"),
  segment: z.enum([
    "uniformes-profissionais",
    "linha-hospitalar",
    "uniformes-escolares",
    "texteis-hotelaria",
    "outro",
  ]),
  quantity: z.string().min(1, "Informe uma quantidade estimada"),
  message: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
