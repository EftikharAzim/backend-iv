package main

import (
	"context"
	"log"
	"net"

	pb "grpc-go-server/calculatorpb" // Replace with your module name

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type server struct {
    pb.UnimplementedCalculatorServer
}

func (s *server) Add(ctx context.Context, req *pb.AddRequest) (*pb.AddReply, error) {
    sum := req.A + req.B
    return &pb.AddReply{Result: sum}, nil
}

func (s *server) Subtract(ctx context.Context, req *pb.AddRequest) (*pb.AddReply, error) {
    return &pb.AddReply{Result: req.A - req.B}, nil
}

func (s *server) Multiply(ctx context.Context, req *pb.AddRequest) (*pb.AddReply, error) {
    return &pb.AddReply{Result: req.A * req.B}, nil
}

func (s *server) Divide(ctx context.Context, req *pb.AddRequest) (*pb.AddReply, error) {
    if req.B == 0 {
        return nil, status.Error(codes.InvalidArgument, "division by zero")
    }
    return &pb.AddReply{Result: req.A / req.B}, nil
}

func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("Failed to listen: %v", err)
    }
    grpcServer := grpc.NewServer()
    pb.RegisterCalculatorServer(grpcServer, &server{})
    log.Println("gRPC Go server running on :50051")
    if err := grpcServer.Serve(lis); err != nil {
        log.Fatalf("Failed to serve: %v", err)
    }
}