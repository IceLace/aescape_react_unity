using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class myScripts : MonoBehaviour
{
    public GameObject model;
    public Material material;

    private bool is_rotating;
    private Color[] color_list = {
        new Color(0, 0, 0, 0),
        new Color(0, 0, 255, 0),
        new Color(0, 255, 0, 0),
        new Color(255, 0, 0, 0),
        new Color(255, 255, 255, 0)
    };
    private int color_selected;
    //public Texture texture;

    public void SetRotation(int rotate)
    {
        is_rotating = rotate != 0;
    }

    public void SetActive(int active)
    {
        bool is_active = active != 0;
        model.SetActive(is_active);
    }

    public void ChangeColor()
    {
        color_selected += 1;
        if (color_selected == color_list.Length)
        {
            color_selected = 0;
        }
        material.SetColor("_Color", color_list[color_selected]  );
    }

    // Start is called before the first frame update
    void Start()
    {
        model.SetActive(true);
        color_selected = 0;
        material.SetColor("_Color", color_list[color_selected]);
        //material.SetTexture("_MainTex", texture);
    }

    // Update is called once per frame
    void Update()
    {
        if (is_rotating)
        {
            model.transform.Rotate(Vector3.forward * 50 * Time.deltaTime, Space.Self);
        }
    }
}
