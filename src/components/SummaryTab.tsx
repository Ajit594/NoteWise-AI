import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface SummaryTabProps {
  summary: string;
}

export default function SummaryTab({ summary }: SummaryTabProps) {
  const bulletPoints = summary
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('* ') || line.startsWith('- '))
    .map(line => line.substring(2));

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <FileText />
          Key Points Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bulletPoints.length > 0 ? (
          <ul className="space-y-3 pl-5 list-disc">
            {bulletPoints.map((point, index) => (
              <li key={index} className="text-base">
                {point}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base whitespace-pre-wrap">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
