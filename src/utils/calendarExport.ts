import { GameRelease } from "@/data/releasesData";

export function generateIcsFile(release: GameRelease): void {
  const dateFormatted = release.releaseDate.replace(/-/g, "");
  
  const title = release.type === "drop" 
    ? `Game Launch: ${release.title}` 
    : `Major Update: ${release.title}`;

  const description = [
    release.summary,
    `Platforms: ${release.platforms.join(", ")}`,
    release.type === "drop" && release.dropDetails?.price ? `Price: ${release.dropDetails.price}` : "",
    release.type === "update" && release.updateDetails?.version ? `Version: ${release.updateDetails.version}` : "",
    "Tracked via NEXUS DROP"
  ].filter(Boolean).join("\\n");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NexusDrop//Gaming Calendar//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:nexusdrop-${release.id}-${Date.now()}@nexusdrop.gg`,
    `DTSTAMP:${dateFormatted}T000000Z`,
    `DTSTART;VALUE=DATE:${dateFormatted}`,
    `DTEND;VALUE=DATE:${dateFormatted}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `STATUS:CONFIRMED`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${release.title.replace(/[^a-zA-Z0-9]/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
