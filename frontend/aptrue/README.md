
```
aptrue
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc.json
├─ .vscode
│  └─ settings.json
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ account_profile.png
│  │  ├─ alarm.png
│  │  ├─ alarm_click.png
│  │  ├─ apply.png
│  │  ├─ apply_blue.png
│  │  ├─ apply_click.png
│  │  ├─ apply_white.png
│  │  ├─ bell_blue.png
│  │  ├─ bell_white.png
│  │  ├─ calendarIcon.png
│  │  ├─ cctv_black.png
│  │  ├─ cctv_white.png
│  │  ├─ home_black.png
│  │  ├─ home_white.png
│  │  ├─ Iogout_blue.png
│  │  ├─ logout.png
│  │  ├─ logoutbutton.png
│  │  ├─ logout_click.png
│  │  ├─ logout_white.png
│  │  ├─ manager_black.png
│  │  ├─ manager_white.png
│  │  ├─ plusIcon.png
│  │  ├─ profileImage.png
│  │  └─ searchIcon.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ (appProtected)
│  │  │  └─ m
│  │  │     ├─ layout.module.scss
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ (webProtected)
│  │  │  └─ (web)
│  │  │     ├─ admin
│  │  │     │  ├─ layout.tsx
│  │  │     │  ├─ page.module.scss
│  │  │     │  └─ page.tsx
│  │  │     ├─ cctv
│  │  │     │  ├─ @cctvForm
│  │  │     │  │  ├─ cctvForm.module.scss
│  │  │     │  │  ├─ default.tsx
│  │  │     │  │  ├─ form
│  │  │     │  │  │  └─ page.tsx
│  │  │     │  │  └─ page.tsx
│  │  │     │  ├─ @cctvList
│  │  │     │  │  ├─ cctvList.module.scss
│  │  │     │  │  ├─ defalut.tsx
│  │  │     │  │  ├─ layout.tsx
│  │  │     │  │  ├─ page.tsx
│  │  │     │  │  └─ [page]
│  │  │     │  │     └─ page.tsx
│  │  │     │  ├─ layout.module.scss
│  │  │     │  └─ layout.tsx
│  │  │     ├─ layout.tsx
│  │  │     ├─ page.module.scss
│  │  │     └─ page.tsx
│  │  ├─ favicon.ico
│  │  └─ layout.tsx
│  ├─ components
│  │  ├─ .gitkeep
│  │  ├─ admin
│  │  │  ├─ DefaultTableItem.tsx
│  │  │  ├─ Table.module.scss
│  │  │  ├─ TableColumn.tsx
│  │  │  ├─ TableInput.tsx
│  │  │  └─ TableItem.tsx
│  │  ├─ cctv
│  │  │  ├─ cctv.module.scss
│  │  │  ├─ cctvForm.module.scss
│  │  │  ├─ cctvForm.tsx
│  │  │  ├─ cctvHeader.tsx
│  │  │  ├─ cctvList.tsx
│  │  │  └─ cctvListItem.tsx
│  │  └─ common
│  │     ├─ button
│  │     │  ├─ Button.module.scss
│  │     │  └─ Button.tsx
│  │     ├─ header
│  │     │  ├─ Headerbar.module.scss
│  │     │  └─ Headerbar.tsx
│  │     ├─ input
│  │     │  ├─ AppInput.module.scss
│  │     │  ├─ AppInput.tsx
│  │     │  ├─ GeneralInput.tsx
│  │     │  ├─ Input.module.scss
│  │     │  ├─ LoginInput.module.scss
│  │     │  ├─ LoginInput.tsx
│  │     │  ├─ TimeInput.module.scss
│  │     │  └─ TimeInput.tsx
│  │     ├─ navbar
│  │     │  ├─ ApartCard.module.scss
│  │     │  ├─ ApartCard.tsx
│  │     │  ├─ AppNav.module.scss
│  │     │  ├─ AppNav.tsx
│  │     │  ├─ WebNav.module.scss
│  │     │  └─ WebNav.tsx
│  │     └─ pagination
│  │        ├─ Pagination.module.scss
│  │        └─ Pagination.tsx
│  ├─ state
│  │  ├─ atoms
│  │  │  ├─ atoms.ts
│  │  │  └─ cctvAtoms.ts
│  │  └─ selectors
│  │     └─ selector.ts
│  ├─ styles
│  │  ├─ constants
│  │  │  └─ colors.scss
│  │  ├─ globals.scss
│  │  └─ reset.scss
│  ├─ types
│  │  ├─ admin.d.ts
│  │  ├─ cctv.d.ts
│  │  └─ common.d.ts
│  └─ utils
│     └─ RecoilRootProvider.tsx
└─ tsconfig.json

```