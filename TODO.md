- Linter
- Beautifier
- Delete
- Duplicate
- rights for browser openLink
- translations
- theme provider + refacto

- Documentation
- Tests

- Text Wrapper
- ActivityIndicator Wrapper
- TextInput Wrapper
- Alert Wrapper (custom toaster ?)
- systeme d'erreur global ? via une liste d'erreur en enum et le toaster ?
- move input in input directory (Text/Search/Checkbox)

- gérer le undefined directrment au niveau du reducer pour eviter sa :
- voir aussi pour simplifié le total/currentPage (faire un canShowMore)
  <SearchResult<GithubUser>
  items={state.github.users.search.length > 0 ? state.github.users.data : undefined}
  total={state.github.users.total}
  currentPage={state.github.users.page}
