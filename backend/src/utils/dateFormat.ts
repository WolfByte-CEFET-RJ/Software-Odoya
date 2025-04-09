export default class DateFormat{
    public static async validateDate(date: Date) {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        const dateFormat = new Date(date);
        const dateString = dateFormat.toISOString()
        console.log(dateFormat);
        console.log(dateString);

        if (!regex.test(dateString)) {
            console.log("Erro: Data mal formatada");
            throw new Error("Date bad formatted");
        }

        return dateFormat;
       
    }
}