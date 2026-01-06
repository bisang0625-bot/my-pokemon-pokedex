#!/usr/bin/env python3
"""
포켓몬 이미지 그리드를 개별 파일로 분할하는 스크립트
이미지가 3x4 그리드로 배열되어 있다고 가정합니다.
"""

import sys
from PIL import Image
import os

def split_pokemon_grid(input_image_path, output_dir='../src/assets'):
    """
    포켓몬 그리드 이미지를 개별 파일로 분할
    
    이미지 레이아웃:
    - 3열 x 4행 = 12개 포켓몬
    - 1행: 불 포켓몬 (Charmander, Charmeleon, Charizard, 나무 포켓몬)
    - 2행: 물 포켓몬 (Squirtle, Wartortle, Blastoise, 나무 포켓몬)
    - 3행: 풀 포켓몬 (Bulbasaur, Ivysaur, Blastoise, 나무 포켓몬)
    """
    
    # 이미지 로드
    try:
        img = Image.open(input_image_path)
    except FileNotFoundError:
        print(f"❌ 이미지 파일을 찾을 수 없습니다: {input_image_path}")
        return False
    except Exception as e:
        print(f"❌ 이미지 로드 오류: {e}")
        return False
    
    width, height = img.size
    print(f"📐 이미지 크기: {width} x {height}")
    
    # 그리드 크기 (3열 x 4행)
    cols = 3
    rows = 4
    
    # 각 셀 크기
    cell_width = width // cols
    cell_height = height // rows
    
    print(f"📏 셀 크기: {cell_width} x {cell_height}")
    
    # 출력 디렉토리 생성
    os.makedirs(output_dir, exist_ok=True)
    
    # 포켓몬 매핑 (행, 열) -> 파일명
    pokemon_map = {
        # 1행 (불 포켓몬)
        (0, 0): 'fire_1.png',    # Charmander
        (0, 1): 'fire_2.png',    # Charmeleon
        (0, 2): 'fire_3.png',    # Charizard
        
        # 2행 (물 포켓몬)
        (1, 0): 'water_1.png',   # Squirtle
        (1, 1): 'water_2.png',   # Wartortle
        (1, 2): 'water_3.png',   # Blastoise
        
        # 3행 (풀 포켓몬)
        (2, 0): 'grass_1.png',   # Bulbasaur
        (2, 1): 'grass_2.png',   # Ivysaur
        (2, 2): 'grass_3.png',   # Venusaur (나무 포켓몬 중 하나)
    }
    
    # 각 포켓몬 이미지 추출
    success_count = 0
    for (row, col), filename in pokemon_map.items():
        # 셀 위치 계산
        left = col * cell_width
        top = row * cell_height
        right = left + cell_width
        bottom = top + cell_height
        
        # 이미지 자르기
        cropped = img.crop((left, top, right, bottom))
        
        # 저장
        output_path = os.path.join(output_dir, filename)
        cropped.save(output_path, 'PNG')
        print(f"✅ {filename} 저장 완료 ({row+1}행 {col+1}열)")
        success_count += 1
    
    print(f"\n🎉 총 {success_count}개 파일 생성 완료!")
    print(f"📁 저장 위치: {os.path.abspath(output_dir)}")
    return True

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("사용법: python split_pokemon_images.py <이미지_파일_경로>")
        print("\n예시:")
        print("  python split_pokemon_images.py pokemon_grid.png")
        print("  python split_pokemon_images.py ~/Downloads/pokemon.png")
        sys.exit(1)
    
    input_image = sys.argv[1]
    split_pokemon_grid(input_image)

