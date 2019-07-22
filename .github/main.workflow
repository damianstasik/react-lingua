workflow "CI" {
  on = "push"
  resolves = ["Execute tests"]
}

action "Run npm audit" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "audit"
}

action "Install dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
  needs = ["Run npm audit"]
}

action "Execute tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install dependencies"]
  args = "test"
}
