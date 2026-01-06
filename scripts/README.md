# 이미지 분할 스크립트 사용 방법

## 준비사항

1. **Python 설치 확인**
   ```bash
   python3 --version
   ```

2. **필요한 라이브러리 설치**
   ```bash
   pip3 install Pillow
   ```

## 사용 방법

### 방법 1: 이미지 파일 경로 지정

```bash
cd /Users/seungholee/Desktop/Cursor/PKM/scripts
python3 split_pokemon_images.py <이미지_파일_경로>
```

**예시:**
```bash
# 이미지가 데스크톱에 있는 경우
python3 split_pokemon_images.py ~/Desktop/pokemon_grid.png

# 이미지가 다운로드 폴더에 있는 경우
python3 split_pokemon_images.py ~/Downloads/pokemon.png

# 현재 폴더에 있는 경우
python3 split_pokemon_images.py pokemon_grid.png
```

### 방법 2: 이미지 URL에서 다운로드 후 처리

이미지 URL이 있다면 먼저 다운로드:

```bash
# 이미지 다운로드 (예시)
curl -o pokemon_grid.png "이미지_URL_여기"

# 다운로드한 이미지 분할
python3 split_pokemon_images.py pokemon_grid.png
```

## 결과

스크립트 실행 후 `src/assets` 폴더에 다음 파일들이 생성됩니다:

- `fire_1.png` (Charmander)
- `fire_2.png` (Charmeleon)
- `fire_3.png` (Charizard)
- `water_1.png` (Squirtle)
- `water_2.png` (Wartortle)
- `water_3.png` (Blastoise)
- `grass_1.png` (Bulbasaur)
- `grass_2.png` (Ivysaur)
- `grass_3.png` (Venusaur)

## 문제 해결

**오류: ModuleNotFoundError: No module named 'PIL'**
```bash
pip3 install Pillow
```

**오류: 이미지 파일을 찾을 수 없습니다**
- 이미지 파일 경로를 정확히 입력했는지 확인
- 경로에 공백이 있으면 따옴표로 감싸기: `"경로/이미지 파일.png"`

**이미지가 잘못 분할됨**
- 이미지가 정확히 3x4 그리드로 배열되어 있는지 확인
- 필요시 스크립트의 `cols`, `rows`, `pokemon_map` 값을 수정

