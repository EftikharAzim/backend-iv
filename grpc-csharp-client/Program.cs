using Grpc.Net.Client;

class Program
{
    static async Task Main(string[] args)
    {
        using var channel = GrpcChannel.ForAddress("http://localhost:50051");
        var client = new Calculator.CalculatorClient(channel);

        while (true)
        {
            Console.WriteLine("Enter first number or blank to exit: ");
            var aText = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(aText))
                break;

            Console.WriteLine("Enter second number: ");
            var bText = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(bText))
                break;

            Console.WriteLine(
                "Choose operation: 1) Add 2) Subtract 3) Multiply 4) Divide (blank to exit)"
            );
            var op = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(op))
                break;

            if (int.TryParse(aText, out int a) && int.TryParse(bText, out int b))
            {
                switch (op)
                {
                    case "1":
                        var addReply = await client.AddAsync(new AddRequest { A = a, B = b });
                        Console.WriteLine($"Sum: {addReply.Result}");
                        break;
                    case "2":
                        var subReply = await client.SubtractAsync(new AddRequest { A = a, B = b });
                        Console.WriteLine($"Difference: {subReply.Result}");
                        break;
                    case "3":
                        var mulReply = await client.MultiplyAsync(new AddRequest { A = a, B = b });
                        Console.WriteLine($"Product: {mulReply.Result}");
                        break;
                    case "4":
                        // Add basic divide-by-zero check (optional, server should handle too)
                        if (b == 0)
                        {
                            Console.WriteLine("Error: Cannot divide by zero.");
                            break;
                        }
                        var divReply = await client.DivideAsync(new AddRequest { A = a, B = b });
                        Console.WriteLine($"Quotient: {divReply.Result}");
                        break;
                    default:
                        Console.WriteLine("Invalid operation. Please choose 1-4.");
                        break;
                }
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter valid integers.");
            }
        }
    }
}
