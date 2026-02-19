function getTodayDateStr() {
    const now = new Date();
    const nzDateStr = now.toLocaleString("en-US", { timeZone: "Pacific/Auckland" });
    console.log("NZ Date String from toLocaleString:", nzDateStr);

    const nzDate = new Date(nzDateStr);
    console.log("Parsed Date object:", nzDate.toString());

    const year = nzDate.getFullYear();
    const month = String(nzDate.getMonth() + 1).padStart(2, '0');
    const day = String(nzDate.getDate()).padStart(2, '0');
    const result = `${year}-${month}-${day}`;
    console.log("Resulting ID:", result);
    return result;
}

getTodayDateStr();
