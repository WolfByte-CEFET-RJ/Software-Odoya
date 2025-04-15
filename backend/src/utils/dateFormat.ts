export default class DateFormat{
    public static async validateDate(date: Date) {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        const dateFormat = new Date(date);
        const dateString = dateFormat.toISOString()
        
        if (!regex.test(dateString)) {
            console.log("Erro: Data mal formatada");
            throw new Error("Date bad formatted");
        }

        return dateFormat;
       
    }

    public static async convertLocaleDate(date: Date) {
        const dateObj = new Date(date);
        
        const dateNotify = dateObj.toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo"
        });
        const horaryNotify = dateObj.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Sao_Paulo"
        });

        return { dateNotify, horaryNotify };
    }
}