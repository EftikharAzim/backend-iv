# gRPC Calculator Demo

A minimal **cross‑language** calculator that demonstrates gRPC communication  
between a **Go server** and a **C# (.NET) console client**.  
Implemented RPCs: **Add, Subtract, Multiply, Divide**.

---

## Table of Contents

- [gRPC Calculator Demo](#grpc-calculator-demo)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
  - [Prerequisites](#prerequisites)
  - [Setup \& Build](#setup--build)
  - [Running the Demo](#running-the-demo)
    - [Step 1  — Start the Go server](#step1start-the-go-server)
    - [Step 2  — Run the C# client](#step2run-the-c-client)
  - [Protocol Definition](#protocol-definition)
  - [Flow Diagram](#flow-diagram)
  - [References](#references)

---

## Architecture

```text
┌─────────────┐   gRPC over HTTP/2   ┌─────────────┐
│  C# Client  │  ═══════════════════▶│   Go Server │
│ (.NET 6.0)  │◀═══════════════════  │  (Go 1.20+) │
└─────────────┘      Result           └─────────────┘
```

_Both client and server share the same **`calculator.proto`** contract._

---

## Prerequisites

| Tool                   | Minimum version | Notes                                                             |
| ---------------------- | --------------- | ----------------------------------------------------------------- |
| **Go**                 |  1.20           | <https://go.dev/dl/>                                              |
| **.NET SDK**           |  6.0            | <https://dotnet.microsoft.com/download>                           |
| **protoc**             |  3.0            | <https://github.com/protocolbuffers/protobuf/releases>            |
| **protoc‑gen‑go**      |  latest         | `go install google.golang.org/protobuf/cmd/protoc-gen-go@latest`  |
| **protoc‑gen‑go‑grpc** |  latest         | `go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest` |

Add Go plugin binaries to your `PATH` (once):

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

---

## Setup & Build

```bash
# 1. Clone the repository
git clone https://github.com/<your‑github‑user>/grpc-calculator-demo.git
cd grpc-calculator-demo

# 2. Generate Go code from the proto contract
cd grpc-go-server
protoc --go_out=. --go-grpc_out=. calculator.proto
# --> generated files in go-server/calculatorpb/

# 3. Restore .NET dependencies
cd ../grpc-csharp-client
dotnet clean
dotnet restore
dotnet build
```

---

## Running the Demo

### Step 1  — Start the Go server

```bash
cd ../grpc-go-server
go run server.go
```

The server listens on `localhost:50051`.

### Step 2  — Run the C# client

```bash
cd ../csharp-client
dotnet run
```

Follow the interactive prompts:

```text
Enter first number:
Enter second number:
Choose operation: 1) Add 2) Subtract 3) Multiply 4) Divide
```

The client calls the server via gRPC and prints the result.

---

## Protocol Definition

`calculator.proto`

```proto
syntax = "proto3";
option go_package = "./go-server/calculatorpb;calculatorpb";

service Calculator {
  rpc Add      (CalcRequest) returns (CalcReply);
  rpc Subtract (CalcRequest) returns (CalcReply);
  rpc Multiply (CalcRequest) returns (CalcReply);
  rpc Divide   (CalcRequest) returns (CalcReply);
}

message CalcRequest {
  int32 a = 1;
  int32 b = 2;
}

message CalcReply {
  int32 result = 1;
}
```

---

## Flow Diagram

```text
Client console → gRPC stub → HTTP/2 request ─┐
                                             │
                                  Go server ─┼─> executes RPC → returns result
                                             │
Client console ←────────── HTTP/2 response ──┘
```

---

## References

- **Go gRPC documentation:** <https://grpc.io/docs/languages/go/>
- **gRPC for .NET:** <https://grpc.io/docs/languages/csharp/>
- **Protocol Buffers v3 guide:** <https://protobuf.dev/programming-guides/proto3/>
