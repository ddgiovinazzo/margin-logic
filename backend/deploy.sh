#!/usr/bin/env bash
set -e

# Grab the base stack name from package.json name field
BASE_NAME=$(node -p "require('./package.json').name")

# Grab the current branch name (local or GitHub Actions)
if [ -n "$GITHUB_REF_NAME" ]; then
    BRANCH="$GITHUB_REF_NAME"
else
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
fi

# Determine the final stack name dynamically
if [ "$BRANCH" = "main" ]; then
    STACK_NAME="margin-logic-prod"
    ENV_NAME="prod"
    EBAY_ENV="production"
else
    STACK_NAME="margin-logic-dev"
    ENV_NAME="dev"
    EBAY_ENV="sandbox"
fi

echo "=========================================================="
echo "Preparing deployment for stack: $STACK_NAME (Branch: $BRANCH)"
echo "=========================================================="

# Execute SAM build
echo "Running sam build..."
sam build

# Deploying
echo "Running sam deploy..."

sam deploy \
    --stack-name "$STACK_NAME" \
    --resolve-s3 \
    --capabilities CAPABILITY_IAM \
    --no-confirm-changeset \
    --no-fail-on-empty-changeset \
    --parameter-overrides \
        "Environment=$ENV_NAME" \
        "EbayAppId=$EBAY_APP_ID" \
        "EbayCertId=$EBAY_CERT_ID" \
        "EbayDevId=$EBAY_DEV_ID" \
        "EbayEnvironment=$EBAY_ENV"

echo "=========================================================="
echo "Deployment to $STACK_NAME completed successfully!"
echo "=========================================================="
