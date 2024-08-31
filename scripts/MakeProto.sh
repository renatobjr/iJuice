#!/bin/bash

# Set a Protobuf command variables
PROTOC="npx protoc"
TS_PROTO_PLUGIN="--plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto"
TS_OUT="--ts_proto_out"
TS_OPTS="--ts_proto_opt=outputServices=grpc-js,useOptionals=messages,snakeToCamel=false"
JS_OUT="--js_out=import_style=commonjs,binary"
PROTO_PATH="--proto_path"

# Proto dirs
PROTO_DIR="protos"
OUTPUT_PROTO_DIR="app/api"

for protoFile in $PROTO_DIR/*.proto; do
  echo -ne "Extract the file name proto \n"
  service=$(basename "$protoFile" .proto)

  echo -ne "Setting a output proto dir \n"
  outputDir="$OUTPUT_PROTO_DIR/$service/src/generated"
  mkdir -p $outputDir

  echo $outputDir

  echo -ne "Set a protobuffer command to generate the proto files \n"
  protoCommand="$PROTOC \
    $TS_PROTO_PLUGIN \
    $TS_OUT=$outputDir \
    $TS_OPTS \
    $JS_OUT:$outputDir \
    $PROTO_PATH=$PROTO_DIR $protoFile"

  echo -ne "Proto command done \n"
  echo -ne "Proto running \n"
  if ! $protoCommand; then
    echo Error on create: $protoFile
    exit 1
  fi

  echo -ne "Proto file $protoFile done \n"
  
  echo -ne "Copy proto to Gateway service \n"
  cp -r $outputDir app/api/gateway/src
done